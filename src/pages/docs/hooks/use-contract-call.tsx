import { CodeBlock } from '@/components/docs/code-block';

export function DocsUseContractCall() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">useContractCall</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Hook for calling smart contract functions on Stacks.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Import</h2>
        <CodeBlock
          code={`import { useContractCall } from 'stacks-kit';`}
          language="tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock
          code={`import { uintCV, stringAsciiCV } from '@stacks/transactions';

function MintNFT() {
  const { call, isLoading, isSuccess, txId, error, reset } = useContractCall();

  const handleMint = async () => {
    try {
      const result = await call({
        contractAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
        contractName: 'my-nft',
        functionName: 'mint',
        functionArgs: [
          uintCV(1),                    // token-id
          stringAsciiCV('My NFT #1'),   // name
        ],
      });
      console.log('Transaction ID:', result.txId);
    } catch (err) {
      console.error('Contract call failed:', err);
    }
  };

  if (isSuccess) {
    return (
      <div>
        <p>NFT minted successfully!</p>
        <a href={\`https://explorer.stacks.co/txid/\${txId}\`}>
          View on Explorer
        </a>
      </div>
    );
  }

  return (
    <button onClick={handleMint} disabled={isLoading}>
      {isLoading ? 'Minting...' : 'Mint NFT'}
    </button>
  );
}`}
          language="tsx"
          filename="MintNFT.tsx"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Parameters</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Parameter</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">contractAddress</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Contract deployer address
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">contractName</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Name of the contract
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">functionName</td>
                <td className="px-4 py-2 font-mono text-xs">string</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Function to call
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">functionArgs</td>
                <td className="px-4 py-2 font-mono text-xs">ClarityValue[]</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Arguments using @stacks/transactions types
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">postConditions</td>
                <td className="px-4 py-2 font-mono text-xs">
                  PostCondition[]?
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Optional post-conditions for safety
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Return Value</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Property</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2 font-mono text-xs">call</td>
                <td className="px-4 py-2 font-mono text-xs">
                  (params) =&gt; Promise
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  Function to initiate contract call
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isLoading</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Whether call is in progress
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">isSuccess</td>
                <td className="px-4 py-2 font-mono text-xs">boolean</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Whether call succeeded
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">txId</td>
                <td className="px-4 py-2 font-mono text-xs">string | null</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Transaction ID if successful
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">error</td>
                <td className="px-4 py-2 font-mono text-xs">Error | null</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Error if call failed
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">reset</td>
                <td className="px-4 py-2 font-mono text-xs">() =&gt; void</td>
                <td className="px-4 py-2 text-muted-foreground">
                  Reset state for new call
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Clarity Value Types</h2>
        <p className="text-muted-foreground">
          Use these helpers from @stacks/transactions to create function
          arguments:
        </p>
        <CodeBlock
          code={`import {
  uintCV,           // Unsigned integer
  intCV,            // Signed integer
  bufferCV,         // Buffer/bytes
  stringAsciiCV,    // ASCII string
  stringUtf8CV,     // UTF-8 string
  principalCV,      // Stacks address
  boolCV,           // Boolean
  listCV,           // List/array
  tupleCV,          // Tuple/object
  noneCV,           // Optional none
  someCV,           // Optional some
} from '@stacks/transactions';`}
          language="tsx"
        />
      </div>
    </div>
  );
}
