import speech_recognition as sr
import time
import re

r = sr.Recognizer() #Audio Record Variable
m = sr.Microphone()

try:
    print("A moment of silence, please...")
    with m as source: r.adjust_for_ambient_noise(source)
    print("Set minimum energy threshold to {}".format(r.energy_threshold))
    while True:
        print("FatimaZ recognition")
##        S = time.time()
        with m as source: audio = r.listen(source)
##        F = time.time()
##        print(F-S, "seconds")
##        print("Got it! Now to recognize it...")
        try:
            # recognize speech using Google Speech Recognition
            value = r.recognize_google(audio, language = "fr-FR")
            print(f"Execute -> {value}")
        except sr.UnknownValueError:
            print("Speak slowly please")
except KeyboardInterrupt:
    pass