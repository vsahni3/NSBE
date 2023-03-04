import cohere

co = cohere.Client('ZG1hp4UsOagPS7V8vOiSxkGMljolDMPi96KAvboq')


training_prompt = '''
Analyze the following input for racism:
Put your hands behind your back, you black monkey. Give me some ID.
Officer, please, you're crushing me.
Shut the fuck up, you worthless scum.
Response: The language used in the text is highly offensive, derogatory,
 and racist. It includes derogatory terms that dehumanize and
 belittle individuals based on their race, and it contains violent
 and abusive language that can be traumatizing and harmful.
--
Analyze the following input for racism:
Where are you from?
Nigeria.
Wow, you speak surprisingly good english considering you are from Nigeria.
Response: The comment shows a bias towards people from Nigeria. It
 implies that people from Nigeria are not expected to speak good
 English.
'''


def reply(prompt):
    prompt = f'''
    Analyze the following text for racism:
    {prompt}
    '''
    response = co.generate(
    model='command-xlarge-nightly',
    prompt=training_prompt + '--' + prompt,
    max_tokens=150,
    temperature=0.8,
    stop_sequences=["--"],
    return_likelihoods='NONE',
    truncate='START')
    return response.generations[0].text.strip('-').strip('\n')

sample_prompt = '''
Analyze the following input for racism:

Response:
'''
