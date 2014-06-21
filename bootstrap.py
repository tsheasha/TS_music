import requests
url = 'http://localhost:3000/follow'
payload = {"follower":"a","followee":"b"}
m = requests.post(url, payload)
print m
payload = {"follower":"a","followee":"c"}
m = requests.post(url, payload)
print m
payload = {"follower":"b","followee":"c"}
m = requests.post(url, payload)
print m
payload = {"follower":"b","followee":"d"}
m = requests.post(url, payload)
print m
payload = {"follower":"b","followee":"e"}
m = requests.post(url, payload)
print m
payload = {"follower":"c","followee":"a"}
m = requests.post(url, payload)
print m
url = 'http://localhost:3000/listen'
payload = {"user":"a","song":"m7"}
m = requests.post(url, payload)
print m
payload = {"user":"a","song":"m6"}
m = requests.post(url, payload)
print m
payload = {"user":"b","song":"m4"}
m = requests.post(url, payload)
print m
payload = {"user":"b","song":"m9"}
m = requests.post(url, payload)
print m
payload = {"user":"c","song":"m8"}
m = requests.post(url, payload)
print m
payload = {"user":"c","song":"m7"}
m = requests.post(url, payload)
print m
payload = {"user":"c","song":"m4"}
m = requests.post(url, payload)
print m
payload = {"user":"d","song":"m2"}
m = requests.post(url, payload)
print m
payload = {"user":"d","song":"m6"}
m = requests.post(url, payload)
print m
payload = {"user":"d","song":"m7"}
m = requests.post(url, payload)
print m
payload = {"user":"e","song":"m11"}
m = requests.post(url, payload)
print m
url = 'http://localhost:3000/recommendations?user=a'
m = requests.get(url)
print m.json()
