# Byggfas – använder .NET SDK för att bygga projektet
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Kopiera projektfil och återställ beroenden
COPY dt191g_projekt.csproj ./
RUN dotnet restore dt191g_projekt.csproj

# Kopiera övriga filer och bygg projektet
COPY . ./
RUN dotnet publish dt191g_projekt.csproj -c Release -o out

# Driftfas – kör i lättvikts-runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Render förväntar sig att appen lyssnar på port 10000
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "dt191g_projekt.dll"]
