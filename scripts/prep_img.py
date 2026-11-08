import json, sys
from PIL import Image, ImageOps
IDX=json.load(open(sys.argv[1],encoding='utf8'))
PICK={ # nazwa: (klucz, szerokosc)
 'hero':('SALABANKIETO#69',2000),
 'hero-plener':('ślubaj#5',1600),
 'wesela':('ślubaj#11',1200),
 'sala-bankietowa':('SALABANKIETO#3',1200),
 'sala-plenerowa':('ślubaj#0',1200),
 'przyjecia':('SALABANKIETO#16',1200),
 'wydarzenia':('SALABANKIETO#29',1200),
 'kuchnia-1':('jedzenie#40',1200),
 'kuchnia-2':('jedzenie#34',900),
 'kuchnia-3':('jedzenie#26',1200),
 'kuchnia-zespol':('jedzenie#45',1400),
 'g1':('weseleGabiik#3',1000),'g2':('weseleGabiik#22',1000),'g3':('ślubaj#9',1000),
 'g4':('SALABANKIETO#64',1000),'g5':('jedzenie#38',1000),'g6':('ślubaj#13',1000),
 'g7':('SALABANKIETO#18',1000),'g8':('weseleGabiik#28',1000),
 'wejscie':('SALABANKIETO#48',1200),
 'bank-wieczor':('SALABANKIETO#89',1600),'bank-dzien':('SALABANKIETO#79',1600),
 'plener-wieczor':('ślubaj#13',1600),'plener-dzien':('ślubaj#5',1600),
 'd1':('jedzenie#6',800),'d2':('jedzenie#12',800),'d3':('jedzenie#35',800),'d4':('jedzenie#38',800),'d5':('jedzenie#44',800),'d6':('jedzenie#24',800),'d7':('jedzenie#46',800),
 'hero-2':('ślubaj#11',2000),'hero-3':('SALABANKIETO#64',2000),
}
for name,(k,w) in PICK.items():
    key=next(x for x in IDX if x.endswith(k.split('#')[0][-6:]+'#'+k.split('#')[1]) and k.split('#')[0][-6:] in x)
    im=ImageOps.exif_transpose(Image.open(IDX[key])).convert('RGB')
    if im.width>w: im=im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
    im.save(f'public/img/{name}.webp',quality=80,method=6); print(name,key,im.size)
