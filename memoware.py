import tkinter as tk
from tkinter import messagebox
import random

# Sample prayer text
PRAYER_TEXT = """
Pater noster, qui es in caelis, sanctificetur nomen tuum.
Adveniat regnum tuum.
Fiat voluntas tua, sicut in caelo et in terra.
Panem nostrum quotidianum da nobis hodie,
et dimitte nobis debita nostra,
sicut et nos dimittimus debitoribus nostris.
Et ne nos inducas in tentationem,
sed libera nos a malo. Amen.
"""

class PrayerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Prayer Memorizer")

        # Window size and background color
        self.root.geometry("600x500")
        self.root.config(bg="#f0f0f0")  # Light gray background

        self.text_lines = [line.strip() for line in PRAYER_TEXT.strip().split('\n') if line.strip()]
        self.difficulty = tk.StringVar(value="Easy")
        self.entries = []
        self.original_words = []

        self.setup_ui()

    def setup_ui(self):
        # text input label
        tk.Label(scrollable_frame, text="Input Material below \n⬇ ⬇ ⬇", font=("Arial", 14), bg="#f0f0f0").pack(pady=10)

        self.text_input = tk.Text(scrollable_frame, height=2, width=50)
        self.text_input.pack(pady=10)

        # Difficulty Label
        tk.Label(scrollable_frame, text="Select Difficulty:", font=("Arial", 14), bg="#f0f0f0").pack(pady=10)

        # Difficulty Dropdown
        difficulty_menu = tk.OptionMenu(scrollable_frame, self.difficulty, "Easy", "Medium", "Hard")
        difficulty_menu.config(font=("Arial", 12), width=15)
        difficulty_menu.pack(pady=5)  # Call pack on the OptionMenu widget

        # Start Button
        start_button = tk.Button(scrollable_frame, text="Start", command=self.start_exercise, font=("Arial", 14), bg="#4CAF50", fg="white", width=20)
        start_button.pack(pady=20)

        # Frame for blanks
        self.exercise_frame = tk.Frame(scrollable_frame, bg="#f0f0f0")
        self.exercise_frame.pack()

        # Submit Button
        self.submit_button = tk.Button(scrollable_frame, text="Submit", command=self.check_answers, state='disabled', font=("Arial", 14), bg="#008CBA", fg="white")
        self.submit_button.pack(pady=20)

        # Score Label
        self.score_label = tk.Label(scrollable_frame, text="", font=("Arial", 14), bg="#f0f0f0")
        self.score_label.pack()

    def start_exercise(self):
        for widget in self.exercise_frame.winfo_children():
            widget.destroy()
        self.entries = []
        self.original_words = []

        prayer_text = self.text_input.get("1.0", "end").strip()

        if prayer_text == "":
            messagebox.showwarning("Input Error", " Please enter a prayer text.")
        #     print("⚠ Empty Input ⚠")
        else:
            self.text_lines =[line.strip() for line in prayer_text.split('\n') if line.strip()]


        difficulty = self.difficulty.get()
        blank_ratio = {"Easy": 0.25, "Medium": 0.50, "Hard": 0.75}[difficulty]

        for line in self.text_lines:
            words = line.split()
            num_blanks = max(1, int(len(words) * blank_ratio))
            blank_indices = random.sample(range(len(words)), num_blanks)

            line_frame = tk.Frame(self.exercise_frame, bg="#f0f0f0")
            line_frame.pack(anchor='w', pady=5)

            for i, word in enumerate(words):
                if i in blank_indices:
                    entry = tk.Entry(line_frame, width=max(len(word), 5), font=("Arial", 12), bg="#FFFACD", relief="solid")
                    entry.pack(side='left', padx=5)
                    self.entries.append(entry)
                    self.original_words.append(word.strip('.,;?!'))
                else:
                    tk.Label(line_frame, text=word + ' ', font=("Arial", 12), bg="#f0f0f0").pack(side='left')

        self.submit_button.config(state='normal')
        self.score_label.config(text="")

    def check_answers(self):
        correct = 0
        total = len(self.original_words)

        for entry, answer in zip(self.entries, self.original_words):
            if entry.get().strip().lower() == answer.lower():
                correct += 1
            else:
                entry.config(bg="#FFB6C1")

        score = (correct / total) * 100
        self.score_label.config(text=f"Score: {score:.1f}% ({correct}/{total})")

if __name__ == '__main__':
    root = tk.Tk()


    container = tk.Frame(root)
    container.pack(fill="both", expand=True)

    canvas = tk.Canvas(container)
    scrollbar = tk.Scrollbar(container, orient="vertical", command=canvas.yview)
    scrollable_frame = tk.Frame(canvas)

    scrollable_frame.bind(
        "<Configure>",
        lambda e: canvas.configure(
            scrollregion=canvas.bbox("all")
        )
    )

    canvas.create_window((0, 0), window=scrollable_frame, anchor="nw")
    canvas.configure(yscrollcommand=scrollbar.set)

    canvas.pack(side="left", fill="both", expand=True)
    scrollbar.pack(side="right", fill="y")


    app = PrayerApp(root)
    root.mainloop()
