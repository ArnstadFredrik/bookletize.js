# PDF-book

NPM module for creating PDF booklets, based on
[jywarren/bookletize.js](https://github.com/jywarren/bookletize.js).

Rewritten as a NPM module.

## Installation

```
npm install
```

## Usage

### shortEdge()

For creating a pdf booklet that duplex prints along the short edge

```js
import { shortEdge } from ''
imoprt fs from 'fs'

const srcFile = fs.readFileSync('input.pdf')

const { booklet, saved } = await shortEdge(srcFile)

fs.saveFileSync('output-short-edge.pdf', saved)
```

### longEdge()

For creating a pdf booklet that duplex prints along the long edge

```js
import { longEdge } from ''
imoprt fs from 'fs'

const srcFile = fs.readFileSync('input.pdf')

const { booklet, saved } = await longEdge(srcFile)

fs.saveFileSync('output-long-edge.pdf', saved)
```

### createBookPDF()

```js
import { createBookPDF } from ''
imoprt fs from 'fs'

const srcFile = fs.readFileSync('input.pdf')

const { booklet, saved } = await createBookPDF(srcFile)

fs.saveFileSync('output-short-edge.pdf', saved)
```

The object returned from `createBookPDF` contains both a raw
[PDFDocument](https://pdf-lib.js.org/docs/api/classes/pdfdocument) `{ booklet }`
and a [saved](https://pdf-lib.js.org/docs/api/classes/pdfdocument#save) `{ saved
}` version. The `booklet` can be manipuated further, where as `saved` is the
array of bytes that can be written to file or downloaded as a Blob.

### rotatePDF()

Primarily for rotating every other page for duplex printing along the
"long-edge".

```js
import { createBookPDF, rotatePDF } from ''
imoprt fs from 'fs'

const srcFile = fs.readFileSync('input.pdf')

const { booklet } = await createBookPDF(srcFile)
const { booklet, saved } = await rotatePDF(booklet)

fs.saveFileSync('output-long-edge.pdf', saved)
```
