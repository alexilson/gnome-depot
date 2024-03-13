# Gnome-Depot

## Description
A simple shopping cart application built with React, Redux, Apollo Client, MongoDB and Stripe. This application is a store front to sell merchandise of your choosing. In this particular case, GNOMES! While this is but a shell and isn't fully functional it gives you an idea of how online shopping websites truly work. 

## Getting Started

You'll want to set up a DB in MongoDB, in this case it's gnomeDb

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/alexilson/gnome-depot
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Adjust the .env**

Change the .env.example to .env and put in your own information

4. **Seed your database**

```
npm run seed
```

5. **Get ready to start the application**

```
npm run develop
```

## Usage

This is a simple store can be exanded at any moment. If you want to change the products, or add to them, you only need to add or edit the databases in the same format. While browsing the wares, you can add to a cart, edit or remove the cart and when you're ready you can checkout. Stripe is an actual online transaction platform that is commonly used through the web. 

## Contributors

Alex Ilson (https://github.com/alexilson)
Mark Bishop (https://github.com/MarkRBishop)
Spencer Cox (https://github.com/Spencox)

## License

MIT License Copyright (c) [2023] [Donnie Noe, Reese Roccaforte, Mark Bishop, Amber Watson]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.