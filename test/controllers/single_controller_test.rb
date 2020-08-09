require 'test_helper'

class SingleControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get single_index_url
    assert_response :success
  end

end
