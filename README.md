> :warning: 
> Even though I personally use this, it's still a work in progress. Use at your own risk.

# 🎨 Matr NFT Art & Metadata Generator

Generate Solana NFT artwork and Metaplex metadata with a single command.

*If you have any questions feel free to reach out on [Discord](http://discord.gg/phV7X425ke) or [Twitter](https://twitter.com/matrbuilders).*

🖥 [Web UI (matr.world/art)](https://matr.world/art)

📦 [Download Example Project](https://raw.githubusercontent.com/matr-builders/matr.art.generator/main/assets/matr-art-gen-demo.zip)

![demo](https://raw.githubusercontent.com/matr-builders/matr.art.generator/main/assets/demo.gif)

## ⚡️ Usage
Once your project is set up and you have a `matr.config.json` file next to your attribute folders, you can run the following command to run `matr-art-generator`.

#### 💡 Tip
To get your project folder path into terminal, drag your project folder into terminal and it will paste the path. Once the path has been added, hit ENTER to start the generator.

```bash
npx matr-art-generator YOUR_PROJECT_FOLDER
```

### 🎉 Result
The resulting metadata and artwork will be exported to `YOUR_PROJECT_FOLDER/build`.

# 🤝 Getting Started
### Install Node
Node is required for the `npx` command and generator to work.
Install https://nodejs.org/en/download/ LTS.

### ⚠️ Issues when trying to run?
If you're having trouble installing/running the generator, try switching your Node version to 15. There is a known issue we are trying to fix where on some systems you have to be using Node 15.

You can view your current node version by running `node --version` in terminal.

To switch your Node version, you can use [NVM](https://github.com/nvm-sh/nvm) which allows you to switch between Node versions and do something along the lines of `nvm install 15` & `nvm use 15`.

## 📦 Project Structure
Structure your attribute directories and value files like the following.
- Each attribute has its own value files.
- Attribute values must be `.png` format.
- A `matr.config.json` exists at the top of the project.
```
my-project
    | - Background
        | - Black.png
        | - Red.png
        | - Yellow.png
    | - Face
        | - Happy.png
        | - Sad.png
        | - Sexy.png
    matr.config.json
```

## ⚒️ Config
![demo](https://raw.githubusercontent.com/matr-builders/matr.art.generator/main/assets/ui.gif)

In order for the generator to run, there needs to be a `matr.config.json` file at the top of your project. You can use our UI to design a config found at [matr.world/art](https://matr.world/art), or you can write your own using the following spec.

```json
{
    "name": "PROJECT_NAME",
    "symbol": "YOUR_SYMBOL",
    "external_url": "YOUR_WEBSITE",
    "description": "YOUR_DESCRIPTION",
    "baseUri": "YOUR_IMAGE_HOSTING",
    "seller_fee_basis_points": 1000,
    "creators": [
        {
            "address": "YOUR_WALLET",
            "share": 100
        }
    ],
    "artwork": [
        {
            "count": 333,
            "attributes": [
                {
                    "directory": "ATTRIBUTE_DIRECTORY"
                },
                {
                    "directory": "ATTRIBUTE_DIRECTORY",
                    "name": "ATTRIBUTE_NICE_NAME"
                },
            ]
        }
    ]
}
```
| Property | Description
|-|-|
`name` | The name of your project and what will be before each NFTs edition. For example, a generated NFTs name could be `PROJECT_NAME #111`.|
`symbol`                    |  Project symbol. |
`external_url`              |      Project website. |
`description`               |  Project description. |
`baseUri`                   |  Where your images are hosted. NFT image paths will be `baseUri/some_number.png`. |
`seller_fee_basis_points`   |  Royalties. `1000` is 10%. |
`creators`   |  A list of creators and percentage amounts to split the royalties. |
`artwork`   |  A list of objects where each object represents an attribute directory. By default, the attribute Name will be the directory name. If you want the name to be something else, you can use the `name` property and still point to whatever `directory` you want to.|

### 🔥 Multiple Attribute Combinations
You can pass multiple attribute configs into the same generation. This lets you do cool things like only generate a set amount of a certain combo making them more rare.
```json
{
    "artwork": [
        {
            "count": 333,
            "attributes": [
                {
                    "directory" : "ATTRIBUTE_DIRECTORY"
                },
                {
                    "directory" : "ATTRIBUTE_DIRECTORY",
                    "name": "ATTRIBUTE_NICE_NAME"
                }
            ]
        },
        {
            "count": 100,
            "attributes": [
                {
                    "directory": "ATTRIBUTE_DIRECTORY"
                },
                {
                    "directory": "ATTRIBUTE_DIRECTORY",
                    "name": "ATTRIBUTE_NICE_NAME"
                },
                {
                    "directory": "SPECIAL_THING",
                },
            ]
        }
    ]
}
```
