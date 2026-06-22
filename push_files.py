import requests
import base64
import os
import sys

token = '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'
owner, repo = 'olucemujexe22', 'ymin'
headers = {'Authorization': f'token {token}', 'Content-Type': 'application/json'}
path = r'c:\Users\Administrator\Desktop\ymin-website'

files = [
    ('.gitignore', 'text'),
    ('index.html', 'text'),
    ('product-center.html', 'text'),
    ('product-detail.html', 'text'),
    ('application-center.html', 'text'),
    ('application-automotive.html', 'text'),
    ('application-ai-server.html', 'text'),
    ('application-airbag.html', 'text'),
    ('chemicon-airbag.html', 'text'),
    ('chemicon-airbag2.html', 'text'),
    ('chemicon-recommend.html', 'text'),
    ('data/automotive-apps.js', 'text'),
    ('data/products.js', 'text'),
    ('anquanqinang.png', 'binary'),
    ('logo.png', 'binary'),
]

print("=" * 50)
print("Uploading {}/{} files to {}/{}".format(len(files), len(files), owner, repo))
sys.stdout.flush()

success_count = 0
for fname, ftype in files:
    fp = os.path.join(path, fname)
    if not os.path.exists(fp):
        print("SKIP {}".format(fname))
        continue
    
    with open(fp, 'rb') as fh:
        data = fh.read()
    
    content_b64 = base64.b64encode(data).decode()
    payload = {'message': 'Add ' + fname, 'content': content_b64, 'branch': 'main'}
    
    r = requests.put('https://api.github.com/repos/{}/{}/contents/{}'.format(owner, repo, fname),
                     headers=headers, json=payload)
    
    if r.status_code == 201:
        success_count += 1
        print("OK {}".format(fname))
    else:
        msg = r.json().get('message', '')[:80]
        print("FAIL {}: {} {}".format(fname, r.status_code, msg))
    sys.stdout.flush()

print()
print("Uploaded {}/{} files successfully!".format(success_count, len(files)))
print("Repository: https://github.com/{}/{}".format(owner, repo))
