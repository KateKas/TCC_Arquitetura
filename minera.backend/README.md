## Publicação

Executar o seguinte comando substituindo o termo "FOLDER_PATH" pelo diretório aonde serão compilados os arquivos: 
> `dotnet publish -c Release -o "FOLDER_PATH"`

## Iniciar Servidor Kestrel

Executar o seguinte comando substituindo o termo "DLL_PATH" pelo diretório do arquivo .dll compilado que representa a aplicação Web: 
> `SET ASPNETCORE_URLS=http://*:80 && dotnet "DLL_PATH"`

## Comando para rodar certificado HTTPS
> dotnet dev-certs https --trust