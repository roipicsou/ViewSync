import requests
from tkinter import *

windows = Tk()
windows.minsize(250, 400)
windows.title("ViewSync")

def get():
    r = requests.get('http://localhost:3000/current-screen')
    print(r.text)

def post(screen: int, lien: str = ""):
    if screen <= 0 or screen >= 4:
        screen = 1

    t = "Screen" + str(screen)

    r = requests.post('http://localhost:3000/change-screen', json={"screen": t, "video": lien})
    print(r.text)

def FScrenn1():
    post(1)

def FScrenn2():
    post(2, "https://www.youtube.com/watch?v=ZynaZugj0PY")

def FScrenn3():
    post(3)

hello = Label(windows, text="hello")
hello.pack(pady=10)  # Ajoute un espace vertical de 10 pixels

Screen1 = Button(windows, text="Screen 1", command=FScrenn1)
Screen1.pack(pady=10)  # Ajoute un espace vertical de 10 pixels

Screen2 = Button(windows, text="Screen 2", command=FScrenn2)
Screen2.pack(pady=10)  # Ajoute un espace vertical de 10 pixels

Screen3 = Button(windows, text="Screen 3", command=FScrenn3)
Screen3.pack(pady=10)  # Ajoute un espace vertical de 10 pixels

windows.mainloop()