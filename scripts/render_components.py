#!/usr/bin/env python3
"""Render approved components from a JSON config. Python standard library only."""
import argparse, html, json, re, shutil
from pathlib import Path
from string import Template
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parents[1]

def text(value):
    if not isinstance(value,str) or not value.strip(): raise ValueError('Required text is empty or not a string')
    return html.escape(value,quote=True)

def url(value):
    text(value)
    parsed=urlsplit(value)
    if parsed.scheme not in ('','https') or value.startswith('//') or '\\' in value or any(ord(c)<32 for c in value):
        raise ValueError('Only relative paths or HTTPS URLs are allowed')
    return text(value)

def render(config):
    lang=config['language']
    if lang not in ('zh-CN','en'): raise ValueError('language must be zh-CN or en')
    en=lang=='en'; app=text(config['app']); b=config['builder']; a=config['agent']; d=config['delivery']
    image=b['image']
    if image['language']!=lang: raise ValueError('Screenshot language must match component language')
    if image['kind'] not in ('original','localized'): raise ValueError('Unknown screenshot kind')
    if image['kind']=='localized': text(image['source'])
    w,h=image['width'],image['height']
    if type(w)!=int or type(h)!=int or min(w,h)<=0: raise ValueError('Invalid image dimensions')
    sources=a['sources']
    if not sources: raise ValueError('UNS sources required')
    available=set()
    for source in sources:
        path=source['path'];text(path)
        if not re.search(r'/(Metric|State|Action)/[^/]+$',path): raise ValueError('Topic must be below Metric, State or Action')
        if not source['fields']: raise ValueError('UNS fields required')
        for field in source['fields']: text(field);available.add(path+'#'+field)
    if not a['field_refs'] or not set(a['field_refs'])<=available: raise ValueError('Analysis field_refs not found in UNS source mapping')
    if a['data_status'] not in ('illustrative','verified'): raise ValueError('Specify illustrative or verified data')
    if a['data_status']=='verified': text(a['evidence'])
    common={'app':app}
    bv={**common,**{k:text(b[k]) for k in ['heading','intro','prompt']},'image':url(image['path']),'alt':text(image['alt']),'width':w,'height':h,'logo':url(config['logo']), 'prompt_label':'Application requirements' if en else '应用构建需求','copy_label':'Copy prompt' if en else '复制需求'}
    if b.get('highlight'):
        highlight=text(b['highlight'])
        if highlight not in bv['heading']: raise ValueError('Builder highlight must appear in heading')
        bv['heading']=bv['heading'].replace(highlight,'<em>'+highlight+'</em>',1)
    result=a['result']
    if result['type']=='table':
        cols=result['columns']; rows=result['rows']
        if not 1<=len(cols)<=5 or not rows or any(len(row)!=len(cols) for row in rows): raise ValueError('Table requires 1–5 columns and consistent nonempty rows')
        body='<table><thead><tr>'+''.join('<th scope="col">'+text(c)+'</th>' for c in cols)+'</tr></thead><tbody>'
        body+=''.join('<tr>'+''.join('<td>'+text(v)+'</td>' for v in row)+'</tr>' for row in rows)+'</tbody></table>'
    elif result['type']=='list':
        if not result['items']: raise ValueError('Result list must not be empty')
        body='<ul>'+''.join('<li>'+text(v)+'</li>' for v in result['items'])+'</ul>'
    else: raise ValueError('Supported results: table or list. Use a reviewed custom component for charts.')
    av={**common,**{k:text(a[k]) for k in ['heading','intro','scenario','question','answer','followup']},'sources':''.join('<code>'+text(v['path'])+'</code>' for v in sources),'result_title':text(result['title']),'result_label':('Illustrative analysis' if en else '分析示意') if a['data_status']=='illustrative' else ('Recorded result' if en else '记录结果'),'result':body,'followup_label':'Follow-up question' if en else '继续提问','preview_label':'Interaction preview · no request is sent' if en else '交互示意 · 不发送查询'}
    parts=[Template((ROOT/'assets/components'/name).read_text()).substitute(values) for name,values in [('builder.html',bv),('agent.html',av)]]
    service=(ROOT/'assets/service-modes/ems-original.html').read_text()
    replacements={'先验证一个车间，再扩展到更多设备和能源介质。':d['scope'],'自主组织 UNS 数据与计量关系':d['organize'],'自主生成、修改和迭代完整 EMS 应用':('Generate, modify and iterate your complete '+config['app']+' application') if en else ('自主生成、修改和迭代完整 '+config['app']+' 应用'),'梳理仪表、系统接口和 UNS 模型':d['integration'],'定制指标计算、应用页面与处理流程':d['customize']}
    if en:
        replacements.update({'自主构建，或购买':'Build it yourself, or use ','工程服务':'engineering services','团队自主构建':'Build with your team','适合愿意自己上手、希望 100% 掌控自己数字化项目的团队。':'For hands-on teams that want 100% control over their digital project.','掌握功能规划、业务流程与项目推进':'Own feature planning, workflows and project delivery','购买工程定制服务':'Purchase custom engineering services','按约定范围完成接入、定制与交付。':'Integration, customization and delivery within an agreed scope.','按约定范围完成验证与交付':'Validate and deliver within the agreed scope'})
    pattern=re.compile('|'.join(re.escape(k) for k in sorted(replacements,key=len,reverse=True)))
    service=pattern.sub(lambda m:text(replacements[m[0]]),service)
    parts.append(service)
    return '\n'.join(parts)

def main():
    ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('config',type=Path);ap.add_argument('--output',type=Path,required=True);ap.add_argument('--force',action='store_true');args=ap.parse_args()
    try:
        config=json.loads(args.config.read_text()); content=render(config)
        assets=['components.css','components.js','service-modes.css']
        destinations=[args.output]+[args.output.parent/n for n in assets]
        if not args.force and any(x.exists() for x in destinations): raise ValueError('Output exists; choose a new directory or use --force after reviewing changes')
        args.output.parent.mkdir(parents=True,exist_ok=True)
        args.output.write_text('<!-- Fragment: insert into an existing semantic page, not a complete website. -->\n<link rel="stylesheet" href="components.css">\n<link rel="stylesheet" href="service-modes.css">\n'+content+'\n<script src="components.js"></script>\n')
        for name in assets:shutil.copy2(ROOT/('assets/service-modes' if name=='service-modes.css' else 'assets/components')/name,args.output.parent/name)
        print(args.output)
    except (ValueError,KeyError,TypeError,OSError) as exc:ap.error(str(exc))
if __name__=='__main__':main()
