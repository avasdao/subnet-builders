# Volatile Memory

The EVM has a virtual stack with which to store 256 bit values. 256-bit words were chosen for compatibility with cryptographic operations. All EVM operations are performed using this virtual stack. The maximum number of elements the stack can contain is 1024. You can copy one of the top 16 elements, or swap the top element with one of the 16 below (meaning you can here access the 17th highest value on the stack). All other opcodes take the pre-determined number of elements from the top of the stack and then push the return value onto the stack.

Volatile memory is received as a freshly cleared instance for each message call. Memory is allocated in words, and gas is used to pay for the expansion of memory to hold the amount of words you’re storing. We need the values with which we want to call a precompile to be sat at the top of this memory.
