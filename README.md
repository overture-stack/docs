# Cloning this repository

To clone the repository with the files in the submodules run:

```git clone --recurse-submodules https://github.com/MitchellShiell/bridge.git```

Once cloned make sure the submodules are up to data:

```git submodule update --remote```

To safely push changes run the following command to ensure all submodules have been pushed correctly

```git push --recurse-submodules=check```