def money_my_child_will_have_when_they_retire(my_age)
    child_age = my_age / 2
    years_left_until_retirement = 65 - child_age
    estimation_of_child_bank_account = child_age ** 2

    estimation_of_child_bank_account * years_left_until_retirement
end