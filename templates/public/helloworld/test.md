
# Hello World!
测试:$$x^2$$

```c++
#include <iostream>

class Foo {

public:
    int w;
    Foo() {
        std::cout << "nop" << std::endl;
    }

    Foo(int i) : w(i) {
        std::cout << "int " << i << std::endl;
    }

    Foo(Foo& f) : w(f.w) {
        std::cout << "Foo&" << f.w << std::endl;
    }

    /*Foo(const Foo& f) : w(f.w) {
        std::cout << "const Foo&" << f.w << std::endl;
    }*/
};

int main() {
    Foo a(1), b(2);
    Foo arr[3] = {
            Foo(1), Foo(2)
    };

    return 0;
}
```