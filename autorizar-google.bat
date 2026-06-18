@echo off
chcp 65001 >nul
title Autorização Google - Dra. Karla Saraiva
cd /d "%~dp0"
set "PATH=%APPDATA%\npm;%PATH%"

echo.
echo ============================================
echo   Autorização Google Business Profile
echo ============================================
echo.
echo ANTES de continuar, verifique se o arquivo
echo .env.local ja tem o GOOGLE_CLIENT_ID e o
echo GOOGLE_CLIENT_SECRET preenchidos.
echo.
echo (Veja as instrucoes no README ou pergunte ao Claude)
echo.
pause
echo.

node scripts/get-token.mjs

echo.
pause
