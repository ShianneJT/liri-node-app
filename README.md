# LIRI Bot

 **LIRI** (*Language Interpretation and Recognition Interface*) **Bot** is a CLI node app that takes in parameters and returns data. Like SIRI, but not.

## Summary

**LIRI Bot** can be used to search for upcoming **concerts** for your favorite artist/band, as well as information on **songs** and **movies**.

![LIRI Bot Interface](https://shiannejt.github.io/liri-node-app/images/01.PNG)

## Setup

- **Node.js** is required

1. Clone the **liri-node-app** to your computer.
2. Run the following command prompt in **LIRI Bot's** root folder:  
``` npm install ```

To begin, simply type ``` node liri ``` in the command prompt

## Commands

**LIRI Bot** accepts the following commands:

- ``` concert-this <artist or band name> ```

![LIRI Bot Interface](https://shiannejt.github.io/liri-node-app/images/02.PNG)

- ``` spotify-this-song <song title> ```

![LIRI Bot Interface](https://shiannejt.github.io/liri-node-app/images/03.PNG)

- ``` movie-this <movie title> ```

![LIRI Bot Interface](https://shiannejt.github.io/liri-node-app/images/04.PNG)

- ``` do-what-it-says ```  
Running this command uses the Node.js File System Module to read and pull information on the content inside the random.txt file, e.g. *spotify-this-song,"song title"*.
