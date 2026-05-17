package com.sad.application.hello;

import com.sad.domain.Greeting;
import org.springframework.stereotype.Service;

@Service
public class GetHelloUseCase {

    public Greeting execute() {
        return new Greeting("Hello from WaR API");
    }
}
