import requests
import base64
import os
import sys

token = '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'
owner, repo = 'olucemujexe22', 'ymin'
headers = {'Authorization': 'token ' + token, 'Content-Type': 'application/json'}
path = 'c:/Users/Administrator/Desktop/2'

files = [
    '.gitignore', 'index.html', 'index-dark.html',
    'product-center.html', 'product-detail.html',
    'application-center.html', 'application-automotive.html',
    'application-ai-server.html', 'application-airbag.html',
    'chemicon-airbag.html', 'chemicon-airbag2.html', 'chemicon-recommend.html',
    'anquanqinang.png', 'logo.png',
    'data/automotive-apps.js', 'data/products.js'
]

print('Uploading ' + str(len(files)) + ' files to ' + owner + '/' + repo)
sys.stdout.flush()

success = 0
for fname in files:
    fp = os.path.join(path, fname)
    if not os.path.exists(fp):
        print('SKIP ' + fname)
        continue

    with open(fp, 'rb') as fh:
        data = fh.read()
    content_b64 = base64.b64encode(data).decode()

    payload = {'message': 'Upload ' + fname, 'content': content_b64, 'branch': 'main'}
    url = 'https://api.github.com/repos/' + owner + '/' + repo + '/contents/' + fname.replace('\\', '/')

    r = requests.put(url, headers=headers, json=payload)
    if r.status_code in (201, 200):
        success += 1
        print('OK ' + fname)
    else:
        msg = r.json().get('message', '')[:100]
        print('FAIL ' + fname + ' ' + str(r.status_code) + ' ' + msg)
    sys.stdout.flush()

print()
print('Uploaded ' + str(success) + '/' + str(len(files)) + ' files!')
print('https://github.com/' + owner + '/' + repo)
