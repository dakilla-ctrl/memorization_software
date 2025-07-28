# Project Journey: Memoware – Memorization Software

## Introduction

**Memoware** is a natural name for my software application. It was born out of a personal need. At one point in my life, I was privileged to attend a private Latin Low Mass. I loved it and began attending every opportunity I had. Eventually, I started learning how to serve at Mass, even before I was formally asked.

It was during this time that I realized I had to memorize many Latin prayers by heart, most of which were completely new to me. I had to do it quickly, not knowing how long the privilege of serving at the Latin Mass would last. Even the prayers I was already familiar with became difficult to recall, especially under pressure. Reciting them freshly and fluently from memory was a challenge.

I began practicing by writing out the prayers from memory repeatedly. During this process, I wished I had a tool that would force me to recall parts of the text actively. I thought such a tool would be incredibly helpful.

At the time, the only solutions that came to mind were flashcards or just rereading the prayers. I didn’t even know what to search for in the Play Store, and for some reason, I didn’t ask an AI. So I decided to build it myself. It also became an opportunity to improve my programming skills. I had some core Python and GUI knowledge, and I believed I could at least create a working prototype.

## What It Does

Memoware helps users memorize text using active recall. Users input any material they want to memorize. The app processes the text and blanks out certain words depending on the selected difficulty level. The user then fills in the blanks from memory, reinforcing learning through repeated recall.

## Technical Breakdown

**Language**: Python
**GUI Toolkit**: Tkinter

I chose Tkinter after asking my system’s AI assistant for options to build a Python application interface. It recommended Tkinter and PyQt5. I selected Tkinter because it is simple and beginner-friendly.

## UI Structure

The application is built around a main root window titled "Memorizer". The UI consists of the following components:

* A label prompting the user to input the text.
* A label and dropdown menu for selecting difficulty level.
* A “Start” button, which triggers the `start_exercise` method.
* A “Submit” button, which triggers the `check_answers` method.
* A label that dynamically displays the user’s score.

## Difficulty Levels

There are three difficulty levels: Easy, Medium, and Hard. Each is mapped to a ratio that determines how many words per line will be blanked. The logic uses random selection to choose which words to blank, providing replay value even with the same material.

## Scoring System

When the user submits their answers, a loop checks each entry against the correct word. Correct answers are counted, and a score is calculated and converted to a percentage. This is then displayed on the UI.

For example, if a user inputs “Hail Mary,” selects Hard, and clicks “Start,” the app blanks out a significant portion of the text. After the user fills in the blanks and clicks “Submit,” the app processes the input and returns a score.

## Challenges Faced

The most difficult part was implementing the difficulty logic. Even though I used AI to help generate the code, understanding the reasoning behind it and adapting it to my needs took time. Another challenge was implementing a scrollable frame in Tkinter. Despite following examples and suggestions, it remained confusing.

In general, precision and clarity in analyzing the code was a major learning point. I had to move from a line-by-line reading of code to understanding code in grouped blocks or systems. This shift in thinking was essential to grasp how the code worked and to learn transferrable skills beyond just assembling components.

## What I Learned

* Approaching code in blocks is more effective than reading line by line.
* Using the Input-Processing-Output (IPO) model helps clarify what a function or block is doing.
* Learning how to engage with AI-generated code critically is a skill in itself.
* Building real-world tools is a valuable way to reinforce learning.

## What’s Next

* Add voice input and voice feedback to the app.
* Explore a mobile version.
* Consider integrating an API-based alarm system for Divine Office reminders.

However, in the short term, I will stay focused on my roadmap to secure a programming job within the next six months. This project was a useful part of that path.

## Final Note

This project was personal. It emerged from both a spiritual need and a practical goal to grow as a developer. I hope that sharing this journey encourages others to build tools that serve real, meaningful needs, even if they start simple.

## Appendix: Original Draft

<details>
<summary>Click to expand</summary>

Introduction: Memoware – Memorization software, this is the natural name of my software application. I was privileged to attend the Latin mass at one point in my life and it was a low mass, a private one. After that, I loved it and started attending it every single opportunity I have to the extent that I started learning to serve even before I was told, it was in this that I realized that I have to memorize a lot of Latin prayers by heart, prayers that are new to me and I have to do it fast, because I don’t know how long this privilege would be around for. I noticed that even the prayers I am familiar with, it's difficult to recite It from memory especially freshly. This is the problem I was facing, recalling freshly or So I thought but recalling freshly, verbally under pressure was a whole different story. I had the idea of writing down the prayers repeatedly from heart until, it's engrained, through this process I wished I had something like the Memoware where I can, forced to recall sections of the text, I thought it will be very helpful.

The existing solutions that were available in my mind at the time were flashcards or just reading the words, in fact, I could not find any besides that, I didn’t even know what to search for, what would someone search for when looking for such an application on playstore? for some reasons I didn't ask an AI. I decided to build. It  was also seen as an opportunity to learn and improve my skill. I thought that with my knowledge of core python and GUI, I could at least build the spine that works.
What it Does:- This app helps you to memorize texts, the main idea is that through active recall, users can memorize specific texts with varying difficulty. So, you choose a text or material, which you input, and the app, splits and blank out some of the words according to the difficulty level selected.
Technical Breakdown: The memoware app is built with python, Tkinter for GUI, I used tkinter because of a simple prompt that I asked the AI assistant on my windows "What can I use for my python software application interface" and I got two options, Tkinter and PyQt5 but because I opted for simplicity and beginner friendliness, I chose tkinter.

UI Structure: The UI is structured with Tkinter, there’s a root window that stores the widgets and canvas, this is the main window. This is named "Memorizer".
There's a label that prompts "Input Material below." This Shows the user where to input custom material - There's also another label that prompts the user to select Difficulty.
A dropdown menu is provided for this option There's a "Start Button" widget, this is where the user clicks to get the exercise started. Clicking this triggers the "Start_exercise" method.
There's another button that submits the exercise. and this triggers the check_answers method this handles the submission process. Another label is created to display score dynamically.
Difficulty: The difficulty levels work by blanking more words per line relative to the difficulty level that is selected. There are three (3) levels easy, medium and hard.
So these levels are mapped to integer ratios, this determines the words to be blanked based on the selected difficulty. It uses a logic that calculates words to be blanked per line and another logic to create random selection to provide replay value.
Scoring: The Scoring aspect works by the use of a logic that loops over the entries and the correct words to check if they match and then count scores by updating incrementally in the UI, the score is converted to percentage and displayed.
For Example, if the user inputs material, by using the input widget, For example the user inputs  "Hail Mary" and sets difficulty to "hard" and clicks start, the app shows the inputted Hail Mary with majority of the words blanked out.
Then, are blanks are filled, and the user clicks the submit button, this processes the current session and output scores. Another session can be started by clicking the Start button again. [Inserts Screen shots for every action.]
Challenges Faced: To be honest the major challenge was setting the difficulty logic. Even though, in all honesty, I was assisted by AI, understanding it still proved difficult. Another part was the scrollable frame which didn't understand how to implement this was also confusing and difficult to understand even after AI helped with it.
Generally speaking it was precision, accuracy of my language when doing the analysis of the code to understand how it works and also the parts where I have to think in purpose grouping way, more like system thinking, I had to do this which was a major part of this project to understand technically how the code works and gain/learn transferrable skills, given that the bulk of it was written by AI.
What I Learned: I learnt that thinking about a piece of code is better done in code blocks, rather than line by line breakdown as I started.
I now approach code with IPO Model. Asking, what is the input, processing and output of this code.
It enhances a higher level thinking which is definitely helpful moving on.
Next I want to make this app voice enabled, I have a couple of options: Mobile version, I also want to work with API, So create an Alarm for the divine office. But realistically I will stick to my roadmap for getting a job in 6 months.


</details>

