# Cloning this repository

To clone the repository with the files in the submodules run:

```bash
git clone --recurse-submodules https://github.com/MitchellShiell/bridge.git
```

To pull a new submodule into your project after it has been added to the `.gitmodules` file, you can follow these steps:

## Initializing the new submodules

Run the following command to initialize the new submodule:

```bash
git submodule update --init --recursive
```

This command initializes all submodules, including the new one, and clones them into your project [1].

### Step 3: Fetch the latest changes

Fetch the latest changes for all submodules, including the new one:

```bash
git fetch --recurse-submodules
```

This command fetches the latest changes for all submodules [1].

### Step 4: Pull the new submodule

Now, you can pull the new submodule using:

```bash
git submodule update --recursive --remote
```

This command pulls the latest changes for all submodules, including the new one [1].

# Docusaurus

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
