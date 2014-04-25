require 'spec_helper'

describe UsersAnswer do
  it { should validate_presence_of :question }
  it { should validate_presence_of :choice }
end
