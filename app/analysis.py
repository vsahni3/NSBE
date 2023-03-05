import cohere
from cohere.classify import Example

co = cohere.Client('ZG1hp4UsOagPS7V8vOiSxkGMljolDMPi96KAvboq')

count = [0]
training_prompt = '''
For context, a black male is talking with a police officer.
Analyze the following input for racism:
I am surprised you are speaking so articulately.

Response: The language used in the text shows a subtle bias towards black people. 
It implies they usually do not speak clearly.
--
For context, a black male is talking with a police officer.
Analyze the following input for racism:
Wow, you speak surprisingly good english considering you are from Nigeria.

Response: The comment shows a bias towards people from Nigeria. It
 implies that people from Nigeria are not expected to speak good
 English.
--
For context, a black male is talking with a police officer.
Analyze the following input for racism:
Have a safe trip.

Response: The comment is not racist at all. It is neutral and polite.
'''


examples=[
  Example("For context, a black male is talking with a police officer. Put your hands behind your back, you black monkey. Give me some ID.\nOfficer, please, you're crushing me.\nShut the fuck up, you worthless scum.", "Intentionally racist"),
  Example("For context, a black male is talking with a police officer. Where are you from?\nNigeria.\nWow, you speak surprisingly good english considering you are from Nigeria.", "Unintentionally racist"),
  Example("For context, a black male is talking with a police officer. Hey, could I see some ID please?\nSure, officer.", "Neutral"),
  Example('For context, a black male is talking with a police officer. Have a good day!', 'Neutral'),
  Example('For context, a black male is talking with a police officer. You are surpisingly articulate for a black person', 'Unintentionally racist'),
  Example('For context, a black male is talking with a police officer. Stay down, you black scum', 'Intentionally racist'),
  Example('For context, a black male is talking with a police officer. Has this car been stolen by you?', 'Unintentionally racist'),
  Example('For context, a black male is talking with a police officer. Have a good day, and drive safely.', 'Neutral')
]

def classify(prompt):
  prompt = f'For context, a black male is talking with a police officer.{prompt}'
  response = co.classify(  
    model='large',  
    inputs=[prompt],  
    examples=examples)

  return response.classifications[0].prediction

def reply(prompt):
    prompt = f'''
    Analyze the following text for racism:
    For context, a black male is talking with a police officer.
    {prompt}
    Response:
    '''
    response = co.generate(
    model='command-xlarge-nightly',
    prompt=training_prompt + '--' + prompt,
    max_tokens=100,
    temperature=0.8,
    stop_sequences=["--"],
    return_likelihoods='NONE',
    truncate='START')
    return response.generations[0].text.strip('-').strip('\n').strip(' ')

sample_prompt = '''
For context, a black male is talking with a police officer.
Analyze the following input for racism:
Why are you driving such a nice car?

Response:
'''
# print(reply(sample_prompt))
# print(classify(sample_prompt))

