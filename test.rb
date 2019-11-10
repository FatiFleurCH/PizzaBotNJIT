def greet(first_name, last_name)
    p "Hey " + first_name + "there " + last_name 
end
names = ["Grace", "Hopper"]

greet(*names)