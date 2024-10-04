from browser import document, aio, window
from urllib.parse import quote


async def main():
    inp = document['contact-input']
    ctt_div = document['contact-input-div']
    ctt_btn = document['contact-button']

    inp.bind(
        'focus', 
        lambda e: ctt_div.set_style(
            "border-radius: 20px; width: 20rem; border: 3px solid #c89fa3; transition: border-color 0.3s;"
        )
    )
    inp.bind(
        'blur', 
        lambda e: ctt_div.set_style(
            "border-radius: 20px; width: 20rem; border: 3px solid transparent; transition: border-color 0.3s;"
        )
    )
    
    def on_keyup(e):
        text = quote(str(inp.value).strip())
        ctt_btn.setAttribute('href', f'https://wa.me/5527988724130?text={text}')

    inp.bind('keyup', on_keyup)

    social = document['social']
    def on_resize(e):
        if social.width > 100:
            social.setAttribute('class', 'col-md-2 d-flex justify-content-center gap-3 g-0')
        else:
            social.setAttribute('class', 'col-md-2 d-flex flex-column justify-content-end gap-3 g-0')
        
    on_resize(None)
    window.bind('resize', on_resize)


aio.run(main())
