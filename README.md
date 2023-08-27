# Reactive
Reactive is a synchronous, reactive library for the Effekt programming language. By utilizing Algebraic Effect Handlers (AEH), it facilitates versatile applicability, allowing the utilization of Reactive across various backends and event emitters.

## How to install
Currently there is no way to install libraries for the Effekt language. 
1. Install the programming langauge [Effekt](https://github.com/effekt-lang/effekt)
2. Create a project folder
3. Clone this repository into the project folder
## How to use
To await an event you need to use the await effekt and its handler `asyncTask`:
```
import reactive/effects
import reactive/internal

import reactive/asyncTask
import reactive/scheduling
import reactive/effects
import reactive/types
import reactive/internal

def task() = asyncTask {
    println("await")
    do await(waitTicks(1)) 
    println("awaited")
}
```
To run the task you need to handle the wrap the task with a Scheduler:
```
def main() = run { task() }
```

If you want to run several task in parallel you can use the binary Scheduler like `oneIsDone`:
```
def main() = run { oneIsDone{ task() }{ task() }}
```
You can find more examples in the tests folders. (Also look into the jsbackend folder)