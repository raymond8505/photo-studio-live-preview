# Why, tho?

I paid a lot of money for my camera and lenses. I'll be damned if Nikon is gonna siphon off more for software that doesn't work exactly how I want.

# What do?!

Watches a directory for new jpgs, displays them a little bit later in simple React gallery. If your camera can shoot jpg (and RAW together) and has software to transfer them to a computer in real time, this aims to be a free and easy studio companion. I'll probably figure out how to do it with just RAW files eventually.

# Ok, but how?

1. clone repo / download zip
2. install packages
3. rename `server/example.ENV` to `.ENV`
4. in `.ENV` set `WATCH_DIR` to your desired directory
5. `yarn client`, `yarn server`, `yarn watcher` in seperate terminals
6. go to http://localhost:5173/ in your browser
