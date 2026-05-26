import json

# Lesson 9
def relu(x): return max(0.0, x)
print(relu((5.0 * -1.0) + 2.0))

# Lesson 10
preds = [2.0, 4.0]
targets = [3.0, 4.0]
print(((preds[0]-targets[0])**2 + (preds[1]-targets[1])**2)/2)

# Lesson 11
model = {'The': ['cat', 'dog'], 'cat': ['sat']}
print(model['The'][0])
print(model['cat'][0])

# Lesson 12
response = '{"prediction": 0.95, "label": "dog"}'
parsed = json.loads(response)
print(parsed['label'])
