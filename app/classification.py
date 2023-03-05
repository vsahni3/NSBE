import cohere
from cohere.classify import Example

co = cohere.Client('ZG1hp4UsOagPS7V8vOiSxkGMljolDMPi96KAvboq')

examples=[
  Example("For context, a black male is talking with a police officer. Put your hands behind your back, you black monkey. Give me some ID.\nOfficer, please, you're crushing me.\nShut the fuck up, you worthless scum.", "Intentionally racist"),
  Example("For context, a black male is talking with a police officer. Where are you from?\nNigeria.\nWow, you speak surprisingly good english considering you are from Nigeria.", "Unintentionally racist"),
  Example("For context, a black male is talking with a police officer. Hey, could I see some ID please?\nSure, officer.", "Neutral"),
  Example('For context, a black male is talking with a police officer. Have a good day!', 'Neutral'),
  Example('For context, a black male is talking with a police officer. You are surpisingly articulate for a black person', 'Unintentionally racist'),
  Example('For context, a black male is talking with a police officer. Stay down, you black scum', 'Intentionally racist')
]

def classify(prompt):
  prompt = f'For context, a black male is talking with a police officer.{prompt}'
  response = co.classify(  
    model='large',  
    inputs=[prompt],  
    examples=examples)

  return response.classifications[0].prediction

