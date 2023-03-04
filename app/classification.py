import cohere
from cohere.classify import Example

co = cohere.Client('ZG1hp4UsOagPS7V8vOiSxkGMljolDMPi96KAvboq')

examples=[
  Example("Put your hands behind your back, you black monkey. Give me some ID.\nOfficer, please, you're crushing me.\nShut the fuck up, you worthless scum.", "Intentionally racist"),
  Example("Where are you from?\nNigeria.\nWow, you speak surprisingly good english considering you are from Nigeria.", "Unintentionally racist"),
  Example("Hey, could I see some ID please?\nSure, officer.", "Neutral")
]

def classify(prompt):
  response = co.classify(  
    model='large',  
    inputs=[prompt],  
    examples=examples)

  return response.classifications[0]