from browser import document, bind
from urllib.parse import quote
from datetime import datetime

form = document["contact-form"]
form_style = """
    background-color: #2a3f54;
    border-radius: 200px;
    padding: 1.4%;
    width: 50%;
    display: flex;
    justify-content: center;
"""

@bind('#contact-input', 'focus')
def on_focus_contact_input(e):
    form.set_style(form_style + "border: 3px solid #3a6a8b")


@bind('#contact-input', 'blur')
def on_blur_contact_input(e):
    form.set_style(form_style)


@bind('#contact-input', 'keyup')
def on_keyup(e):
    text = quote(str(e.target.value).strip())
    if text:
        document['contact-button'].setAttribute('href', f'https://wa.me/5527988724130?text={text}')


document['age'].text = datetime.now().year - 2002
