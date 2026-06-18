@echo off
chcp 65001 >nul
title Landing Page - Dra. Karla Saraiva
cd /d "%~dp0"

echo ============================================
echo   Iniciando o projeto - Dra. Karla Saraiva
echo ============================================
echo.

REM Garante que a pasta global do npm (onde o pnpm fica) esteja no PATH
set "PATH=%APPDATA%\npm;%PATH%"

REM Descobre como chamar o pnpm
set "PNPM="
where pnpm >nul 2>nul && set "PNPM=pnpm"
if not defined PNPM if exist "%APPDATA%\npm\pnpm.cmd" set "PNPM=%APPDATA%\npm\pnpm.cmd"

REM Se ainda nao achou, tenta via corepack (vem junto com o Node)
if not defined PNPM (
    where corepack >nul 2>nul && (
        echo Ativando pnpm via corepack...
        call corepack enable pnpm >nul 2>nul
        call corepack prepare pnpm@latest --activate >nul 2>nul
        set "PNPM=corepack pnpm"
    )
)

if not defined PNPM (
    echo [ERRO] pnpm nao encontrado.
    echo Abra o PowerShell e rode:  npm install -g pnpm
    echo.
    pause
    exit /b 1
)

REM Instala dependencias na primeira vez
if not exist "node_modules" (
    echo Instalando dependencias pela primeira vez...
    echo.
    call %PNPM% install
    if errorlevel 1 (
        echo.
        echo [ERRO] Falha ao instalar dependencias.
        pause
        exit /b 1
    )
    echo.
)

echo Iniciando o servidor de desenvolvimento...
echo O site abrira em: http://localhost:3000
echo.
echo (Para parar o servidor, pressione Ctrl+C nesta janela)
echo.

REM Abre o navegador apos alguns segundos
start "" cmd /c "timeout /t 4 >nul & start http://localhost:3000"

call %PNPM% dev

pause
