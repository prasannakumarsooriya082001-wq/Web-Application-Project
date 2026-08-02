package com.luxecraft.luxecraft.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;


import com.luxecraft.luxecraft.Model.CustomerModel;
import com.luxecraft.luxecraft.Model.LoginResponse;

import com.luxecraft.luxecraft.Repository.CustomerRepository;

@Service
public class CustomerService 
{

    @Autowired
    private CustomerRepository cr;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;



    public CustomerModel registerCustomer(CustomerModel customer) {

        customer.setRole("CUSTOMER");

        customer.setPassword(passwordEncoder.encode(customer.getPassword()));

        return cr.save(customer);
    }

    public LoginResponse loginCustomer(String email, String password) {

        CustomerModel customer = cr.findByEmail(email).orElseThrow(() -> new RuntimeException("Email not found"));

        if (!passwordEncoder.matches(password, customer.getPassword())) {

            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(customer.getEmail(),customer.getRole());

        return new LoginResponse(token,customer.getFirstName(),customer.getLastName(),customer.getEmail(),customer.getRole());
    }

}
