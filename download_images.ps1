$ErrorActionPreference = "Stop"
$dir = "n:\Work\Demo Themes\corparate solutions\assets"
if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
}

$images = @(
    @{ url = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800&fm=webp"; file = "hero.webp" },
    @{ url = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80&fm=webp"; file = "client1.webp" },
    @{ url = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80&fm=webp"; file = "client2.webp" },
    @{ url = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80&fm=webp"; file = "client3.webp" },
    @{ url = "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800&fm=webp"; file = "about.webp" },
    @{ url = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80&fm=webp"; file = "project1.webp" },
    @{ url = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80&fm=webp"; file = "project2.webp" },
    @{ url = "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600&q=80&fm=webp"; file = "project3.webp" },
    @{ url = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80&fm=webp"; file = "project4.webp" }
)

$headers = @{
    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

foreach ($img in $images) {
    $outFile = Join-Path $dir $img.file
    if (-not (Test-Path $outFile -PathType Leaf)) {
        Write-Host "Downloading $($img.file)..."
        try {
            Invoke-WebRequest -Uri $img.url -OutFile $outFile -Headers $headers -TimeoutSec 30
        } catch {
            Write-Warning "Failed to download $($img.file): $_"
        }
    } else {
        Write-Host "$($img.file) already exists, skipping."
    }
}
Write-Host "Done downloading images."
