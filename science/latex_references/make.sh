#!/bin/bash

pdflatex references.tex
biber references
pdflatex references.tex
