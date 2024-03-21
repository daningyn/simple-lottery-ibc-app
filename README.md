# Lottery gamification using Polymer IBC

## Concept

The concept revolves around the development of a decentralized application (dApp) on a blockchain platform, aimed at enhancing user engagement and interaction with Polymer Labs IBC App through gamification. The core functionality of this dApp involves a recurring bridge challenge that occurs every 2 hours. At each interval, the dApp announces a specific direction that participants must complete sending package using universal channel - a technology enabling the transfer of package across different blockchain platforms.

## How to run it

- For FE, I have configured the contract address in the project.

You just need to run it 
```bash
npm install
npm start
```

- For BE, You need to clone the project at [here](https://github.com/daningyn/simple-lottery-ibc-service)

You need to run it
```bash
npm install
node app.js
```

- For Contract, you need to checkout the branch `simple-lotery` in this repo then follow its readme to install and temperarilly deploy contracts and send packets.

## Core feature

### Timed Challenges: 

The dApp will announce the challenge every 2 hours. Each challenge specifies a particular action users must perform using universal channel, such as transferring a package from one blockchain to another following the dApp's instructions.

### Participation Tracking:

The dApp monitors and records the actions of participants to ensure they comply with the challenge's direction. This includes verifying the completion of bridge transactions within the designated timeframe.

### Performance Aggregation:

After four consecutive challenges (spanning an 8-hour period, 4 times of announcements), the dApp aggregates the performance data of all participants. It assesses their speed and accuracy in completing the bridge transactions as per the challenge requirements.

### Rewards Distribution:

The top 10 participants who demonstrate the fastest and most accurate execution of bridge transactions across the four challenges are rewarded.

The reward mechanism is built into the dApp, utilizing smart contracts to distribute prizes automatically based on the participants' rankings.

The ranking relies on users' speed in completing the transactions.

The formula should be

```
Gap = Sent_Time - Announcement_Time
Total = Gap1 + Gap2 + Gap3 + Gap4
```

Who has shortest total will be win!

## Technical Considerations

### Smart Contract Development:

The backbone of the dApp involves crafting secure and efficient smart contracts that handle challenge announcements, track user participation, aggregate performance data, and manage the rewards distribution process.

### Blockchain infrastructure:

The dApp uses Polymer IBC

### User Interface (UI) and Experience (UX): 

A user-friendly interface is crucial for participant engagement. The dApp should provide clear instructions for each challenge, display real-time rankings, and offer a seamless experience in tracking challenge progress and rewards.

### Security Measures:

Given the financial nature of the rewards and the use of blockchain bridges, the dApp must incorporate robust security measures to prevent fraud, ensure the integrity of transactions, and protect user.
