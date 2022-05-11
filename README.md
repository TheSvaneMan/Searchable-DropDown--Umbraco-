# Searchable-DropDown--Umbraco-
A simple searchable dropdown HTML web component

Intention: 

Create a searchable dropdown component using vanilla JavaScript and DOM manipulation procedures. 
I intentionally left code comments for myself and others to read if needed. 

I aimed for an MVP solution that provides the desired affect of searching through a list of options in a select tag and dynamically selecting the last item corresponding to the last typed input. 

Given the inherit structure of the optionsArray found within the SearchDropdown class, this data could as well be programmatically fed and updated into the element , provided there are with some added adjustments made to the class. 

Simple UI animation/transition (Which in theory could be updated by the user, if a redesign of the class occurs - using class variables instead of "hard-corded" values)
lightweight in terms of CSS. 
Slightly navigational using only keyboard.

CONS: 

I do not like the fact I did not conduct a unit testing solution. (Time constraints)
Unanimated UI - There is no UI  / UX indication presented to the user when there is no corresponding result found.
I wish I spent a little more time on the solution, but given how many other coding assignments I have currently - I did what I thought was the minimal viable solution to the given task. 

------------------------- 
How to use the solution. 

1). Download the source files, which are just 2 files. Place anywhere on system
2). Open the HTML file using browser of choice. 
3). Use input field to search through the drop down menu.
