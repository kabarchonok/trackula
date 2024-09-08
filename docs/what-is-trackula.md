# What is Trackula?

Trackula is a lightweight library that allows you to specify the method of interaction with the interface: `mouse`, `keyboard` or `touch`.

This is useful if you need to differentiate the appearance of the interface based on the method of interaction.


## How it works?

Trackula works based on multiple factors and doesn't _update_ its state with every single keystroke or mouse click. 

For example, if the user interacts with form elements by focusing on them with the mouse, Trackula will ignore the `KeyboardEvent`. However, if the user starts navigating with the Tab key, Trackula will detect this change and update its state to recognise keyboard input.

In this way, Trackula adapts to the user's current method of interacting with the interface by analysing the context and not reacting to individual events unless they indicate a change in the primary input method. This allows Trackula to more accurately track user behaviour and adapt the interface to the user's current method of interaction.

You can view an [example](/examples) on the corresponding page.
