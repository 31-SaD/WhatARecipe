package com.sad.infrastructure.web;

import com.sad.application.hello.GetHelloUseCase;
import com.sad.domain.Greeting;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {

    private final GetHelloUseCase getHelloUseCase;

    public HelloController(GetHelloUseCase getHelloUseCase) {
        this.getHelloUseCase = getHelloUseCase;
    }

    @GetMapping("/hello")
    public Greeting hello() {
        return getHelloUseCase.execute();
    }
}
