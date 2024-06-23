
# this code was executed in google collab
# https://colab.research.google.com/drive/1A0ZP_i7kX3-MA05x1eS66g5L3RRrSLSw?usp=sharing
pip install transformers
from transformers import pipeline
pipe = pipeline("text2text-generation", model="mrm8488/t5-base-finetuned-wikiSQL")
from transformers import AutoModelWithLMHead, AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("mrm8488/t5-base-finetuned-wikiSQL")
model = AutoModelWithLMHead.from_pretrained("mrm8488/t5-base-finetuned-wikiSQL")

def get_sql(query):
  input_text = "translate English to SQL: %s </s>" % query
  features = tokenizer([input_text], return_tensors='pt')

  output = model.generate(input_ids=features['input_ids'],
               attention_mask=features['attention_mask'])

  return tokenizer.decode(output[0])

query = "in which city does employee no 36 live"

get_sql(query)