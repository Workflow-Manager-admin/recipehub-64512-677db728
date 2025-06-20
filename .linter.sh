#!/bin/bash
cd /home/kavia/workspace/code-generation/recipehub-64512-677db728/recipehub_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

