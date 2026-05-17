package com.sad.application.hello;

import com.sad.domain.Greeting;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class GetHelloUseCaseTest {

    @Test
    void should_return_hello_message() {
        GetHelloUseCase useCase = new GetHelloUseCase();

        Greeting greeting = useCase.execute();

        assertThat(greeting.message()).isEqualTo("Hello from WaR API");
    }
}
