//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./base/UniversalChanIbcApp.sol";

contract XCounterUC is UniversalChanIbcApp {
    // application specific state
    uint64 public counter;
    mapping(uint64 => address) public counterMap;
    struct LeaderBoard {
        address sender;
        uint64[] timestamps;
    }
    LeaderBoard[] public leaderboard;

    constructor(address _middleware) UniversalChanIbcApp(_middleware) {}

    // application specific logic
    function resetCounter() internal {
        counter = 0;
    }

    function increment() internal {
        counter++;
    }

    // IBC logic

    /**
     * @dev Sends a packet with the caller's address over the universal channel.
     * @param destPortAddr The address of the destination application.
     * @param channelId The ID of the channel to send the packet to.
     * @param timeoutSeconds The timeout in seconds (relative).
     */
    function sendUniversalPacket(
        address destPortAddr,
        bytes32 channelId,
        uint64 timeoutSeconds
    ) external {
        increment();
        bytes memory payload = abi.encode(msg.sender, counter);

        uint64 timeoutTimestamp = uint64(
            (block.timestamp + timeoutSeconds) * 1000000000
        );

        IbcUniversalPacketSender(mw).sendUniversalPacket(
            channelId,
            IbcUtils.toBytes32(destPortAddr),
            payload,
            timeoutTimestamp
        );

        // Find or create the LeaderBoard entry for the sender
        uint256 senderIndex = leaderboardIndex(msg.sender);
        if (senderIndex == type(uint256).max) {
            // Create a new entry if the sender doesn't exist in the leaderboard
            uint64[] memory emptyArray; // Initialize an empty uint64 array
            leaderboard.push(LeaderBoard(msg.sender, emptyArray));
            senderIndex = leaderboard.length - 1;
        }

        // Add the current timestamp to the sender's leaderboard entry
        leaderboard[senderIndex].timestamps.push(uint64(block.timestamp));
    }

    function leaderboardIndex(address sender) internal view returns (uint256) {
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i].sender == sender) {
                return i;
            }
        }
        return type(uint256).max; // Sender not found
    }

    /**
     * @dev Packet lifecycle callback that implements packet receipt logic and returns an acknowledgement packet.
     *      MUST be overridden by the inheriting contract.
     *
     * @param channelId the ID of the channel (locally) the packet was received on.
     * @param packet the Universal packet encoded by the source and relayed by the relayer.
     */
    function onRecvUniversalPacket(
        bytes32 channelId,
        UniversalPacket calldata packet
    ) external override onlyIbcMw returns (AckPacket memory ackPacket) {
        recvedPackets.push(UcPacketWithChannel(channelId, packet));

        // Decode packet data
        (address payload, uint64 c) = abi.decode(
            packet.appData,
            (address, uint64)
        );

        // Store sender address and timestamp
        counterMap[c] = payload;

        increment();

        return AckPacket(true, abi.encode(counter));
    }

    /**
     * @dev Packet lifecycle callback that implements packet acknowledgment logic.
     *      MUST be overridden by the inheriting contract.
     *
     * @param channelId the ID of the channel (locally) the ack was received on.
     * @param packet the Universal packet encoded by the source and relayed by the relayer.
     * @param ack the acknowledgment packet encoded by the destination and relayed by the relayer.
     */
    function onUniversalAcknowledgement(
        bytes32 channelId,
        UniversalPacket memory packet,
        AckPacket calldata ack
    ) external override onlyIbcMw {
        ackPackets.push(UcAckWithChannel(channelId, packet, ack));

        // Decode the counter from the ack packet
        uint64 _counter = abi.decode(ack.data, (uint64));

        if (_counter != counter) {
            resetCounter();
        }
    }

    /**
     * @dev Packet lifecycle callback that implements packet receipt logic and returns an acknowledgement packet.
     *      MUST be overridden by the inheriting contract.
     *      NOT SUPPORTED YET
     *
     * @param channelId the ID of the channel (locally) the timeout was submitted on.
     * @param packet the Universal packet encoded by the counterparty and relayed by the relayer
     */
    function onTimeoutUniversalPacket(
        bytes32 channelId,
        UniversalPacket calldata packet
    ) external override onlyIbcMw {
        timeoutPackets.push(UcPacketWithChannel(channelId, packet));
        // Do logic
    }

    function getLeaderBoards() external view returns (LeaderBoard[] memory) {
        return leaderboard;
    }
}
