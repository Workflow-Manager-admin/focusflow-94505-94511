#!/bin/bash
cd /home/kavia/workspace/code-generation/focusflow-94505-94511/main_container_for_focusflow
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

