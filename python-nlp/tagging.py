import nltk
import os
from unidecode import unidecode

word_list = []
include = ["C.O.S.-Engie"
,"C.O.S."
,"C.A.G."
,"C.N.O.S."
,"C.O.S.R."
,"C.O.S.R.S."
,"C.O.S.R.N.E."
,"C.O.S.R.C.O."
,"O.N.S."
,"Engie"
,"Prado"
,"Thibes"
,"Grieger"
,"Vitor"
,"Marcão"
,"Adriano"
,"Arilton"
,"Odair"
,"Torres"
,"Mauro"
,"Vagner"
,"Marcelo"
,"Pinheiro"
,"circuito"
,"teve"
,"okay"
,"Fala"
,"Valeu"
,"Eee"
,"Itá"
,"tensão"
,"unidades-geradoras"
,"unidade-geradora"
,"k.v."
,"P.C.H."
,"U.H.E."
,"sobrecorrente"
,"Salto-Santiago"
,"Itá"
,"Salto-Osório"
,"Cana-Brava"
,"Estreito"
,"Jaguara"
,"Prado"
,"Célio"
,"Miranda"
,"Machadinho"
,"São-Salvador"
,"Passo-Fundo"
,"Ponte-de-Pedra"
,"Conjunto"
,"Campo-Largo"
,"Eólica"
,"Conjunto"
,"Trairi"
,"Umburanas"
,"Santa-Mônica"
,"Ferrari"
,"Biomassa"
,"Assú"
,"Solar"
,"Lages"
,"Rondonópolis"
,"José"
,"Rocha"
,"Ibitiúva"
,"Cidade-Azul"
,"Tubarão-P.E.D."
,"Pampa-Sul"
,"Térmica"
,"Umburanas"
,"Jorge-Lacerda"
,"bay"
,"baypassar"
,"baypassando"
,"baypassado"
,"comutações"
,"defluência"
,"vertimento"
,"compensar"
,"reverter"
,"converter"
,"gerar"
,"vertido"
,"turbinado"
,"compensado"
,"reativo"
,"hidrologia"
,"compensando"
,"vertedouro"
,"ambiental"
,"unidade-para-gerador"
,"eleva"
,"volts"
,"reduz"
,"comutação"
,"comutações"
,"barra"
,"gerador"
,"conversor"
,"Oi"
,"até"
,"Fala"
,"SGI"
,"UHSS"
,"UHIT"
,"UHSO"
,"UHCB"
,"UHET"
,"UHJA"
,"UHMI"
,"UHMA"
,"UHSA"
,"UHPF"
,"UHPP"
,"CECL"
,"CETR"
,"CEUR"
,"CESM"
,"UTFE"
,"FVAE"
,"UCLA"
,"PHRO"
,"PHRO"
,"UTIB"
,"UFCA"
,"UETB"
,"UTPS"
,"CEUR"
,"CTJL"
,"UTLA"
,"UTLB"
,"UTLC"]


directory = 'C:\Source\Repositories\hackaton\hackathon-radix-energia\Geracao\Transcrições\\'

for filename in os.listdir(directory):
    if filename.endswith(".txt"):
        f = open(directory+filename)
        sentence = f.read()
        word_list = word_list + nltk.word_tokenize(sentence)
        f.close()

mapa = {}

f = open("tokens.txt", "w")
for word in list(word_list):
    if(word in include and not word.endswith('.wav') and not word.endswith('.mp3')):
        try:
            mapa[word] = mapa[word]+1
        except:
            mapa[word] = 1

print("[")
for palavra, repeticao in mapa.items():
    for i in range(((int)(repeticao/2))+1):
        print("\""+palavra+"\",")
print("]")

f.close()