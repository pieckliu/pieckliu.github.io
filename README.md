# AI / Machine Learning Engineer Portfolio

A dependency-free personal portfolio designed for GitHub Pages. The top navigation switches between Home, Projects, Experience, Research, and Education views without loading a new document.

## Project structure

```text
.
|-- index.html
|-- css/
|   `-- style.css
|-- js/
|   `-- main.js
|-- assets/
|   |-- files/
|   |   `-- cv.pdf
|   `-- images/
|       |-- profile/
|       `-- projects/
`-- README.md
```

## Preview locally

No dependencies or build step are required. From the repository root, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Customize

1. Replace the remaining bracketed text in `index.html` with verified project, experience, research, and education content.
2. Replace the profile SVG and update its path and alt text.
3. Replace project SVGs and update each card's content, technology tags, and links.
4. Replace `assets/files/cv.pdf` with the final CV while keeping the filename, or update both CV links.
5. Replace placeholder GitHub, LinkedIn, and email URLs.

## GitHub Pages

The repository is ready for direct static hosting. Configure GitHub Pages to deploy from the root of the `main` branch.
