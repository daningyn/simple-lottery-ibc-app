## Steps

### Set Contract

```bash
just set-contracts optimism XLottery false && just set-contracts base XLottery false
```

### Deploy Contracts

```bash
just deploy optimism base
```

### Sanity check to verify that configuration files match with your deployed contracts

```bash
just sanity-check
```

### Create Channel

```bash
just create-channel
```

### Try to send packet

```bash
just send-packet optimism
```