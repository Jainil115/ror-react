require "test_helper"

class StakeholdersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @stakeholder = stakeholders(:one)
  end

  test "should get index" do
    get stakeholders_url, as: :json
    assert_response :success
  end

  test "should create stakeholder" do
    assert_difference("Stakeholder.count") do
      post stakeholders_url, params: { stakeholder: { contact: @stakeholder.contact, name: @stakeholder.name, project_id: @stakeholder.project_id, title: @stakeholder.title } }, as: :json
    end

    assert_response :created
  end

  test "should show stakeholder" do
    get stakeholder_url(@stakeholder), as: :json
    assert_response :success
  end

  test "should update stakeholder" do
    patch stakeholder_url(@stakeholder), params: { stakeholder: { contact: @stakeholder.contact, name: @stakeholder.name, project_id: @stakeholder.project_id, title: @stakeholder.title } }, as: :json
    assert_response :success
  end

  test "should destroy stakeholder" do
    assert_difference("Stakeholder.count", -1) do
      delete stakeholder_url(@stakeholder), as: :json
    end

    assert_response :no_content
  end
end
